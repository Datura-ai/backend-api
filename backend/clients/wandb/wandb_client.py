import concurrent
import os
from concurrent.futures import ThreadPoolExecutor
from typing import List

import wandb
from pydantic import BaseModel, Field


class ImageData(BaseModel):
    filename: str
    url: str
    hotkey: str
    uuid: str
    updated_at: str = Field(..., alias='updatedAt')

    class Config:
        allow_population_by_field_name = True


class WandbClient:
    def __init__(self, run_path: str):
        wandb.login(key=os.getenv('WANDB_TOKEN'))
        self.api = wandb.Api()
        self.run_path = run_path
        self.run = self.api.run(self.run_path)

    def _get_image_data_thread(self, file) -> ImageData:
        if file.name.endswith((".png", ".jpg")):
            return ImageData(
                filename=self.get_filename_from_path(file.name),
                url=file.url,
                hotkey=self.run.config['wallet']['hotkey'],
                uuid=file._attrs.get('id'),
                updated_at=file._attrs.get('updatedAt')
            )

    def get_images_data(self) -> List[ImageData]:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = [executor.submit(self._get_image_data_thread, file) for file in self.run.files()]
            image_data = [future.result() for future in concurrent.futures.as_completed(futures) if future.result()]
        return image_data

    def _download_file(self, file, image_dir) -> str:
        if file.name.endswith(".png") or file.name.endswith(".jpg"):
            file.download(root=image_dir, exist_ok=True)
            return file.name
        return ""

    def download_images(self, image_dir="wandb_images"):
        try:
            os.makedirs(image_dir, exist_ok=True)
            run = self.api.run(self.run_path)
            with ThreadPoolExecutor() as executor:
                futures = [executor.submit(self._download_file, file, image_dir) for file in run.files()]
                downloaded_files = [future.result() for future in futures if future.result()]
            return {"status": "success", 'downloaded_files': downloaded_files}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    @staticmethod
    def get_filename_from_path(file_path):
        return os.path.basename(file_path)
