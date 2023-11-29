from typing import Any
import os

import wandb

from web import schemas as s
import constants as c

os.environ["WANDB_API_KEY"] = "d6bab7e01ea64df517b314db07893aca6a5f9449"

api = wandb.Api()

def fetch_images(sort_by: c.WandbSortByEnum) -> list[s.Showcase]:
    # TODO: implement S3 storage with a simple db for caching
    run = api.run("/cortex-t/synthetic-QA/runs/amczp753")
    hotkey = run.config["wallet"]["hotkey"]

    images = []
    for file in run.files():
        if file.name.endswith(".png") or file.name.endswith(".jpg"):
            attrs = file._attrs
            attrs["hotkey"] = hotkey
            images.append(attrs)

    if sort_by.is_recent():
        images.sort(key=lambda x: x["updatedAt"], reverse=True)

    if sort_by.is_hotkey():
        images.sort(key=lambda x: x["hotkey"])

    if sort_by.is_uid():
        images.sort(key=lambda x: x["id"])

    return images
