# import wandb
# import pandas as pd

# api = wandb.Api()
# username = "username here"
# project_name = "project name here"
# run_name = "run name here"
# # run = api.run(f"/{username}/{project_name}/runs/{run_name}")
# run = api.run("/cortex-t/synthetic-QA/runs/amczp753")
# history = run.history()

# # Write the history to a file in JSON format using pandas
# history.to_json('run_history.json', orient='records', lines=True, indent=4)

# print("History has been saved to run_history.json")

import wandb
import os

os.environ["WANDB_API_KEY"] = '445f997d428ad93486d2f6187235620469567157'

# Replace with your run path "entity/project/run_id"
run_path = "entity/project/synthetic-QA"

# Initialize wandb API
api = wandb.Api()

# Access the run

def get_run_images(sortBy):
    # for run in runs:
        # if(run._attrs['state'] == 'finished'):
        #     print(run._attrs['name'])
    run = api.run("/cortex-t/synthetic-QA/runs/amczp753")
    images = []
    hotkey = run.config['wallet']['hotkey']
    for file in run.files():
        if file.name.endswith(".png") or file.name.endswith(".jpg"):
            attrs = file._attrs
            attrs['hotkey'] = hotkey
            images.append(attrs)
    if(sortBy == 'recent'):
        images.sort(key=lambda x: x['updatedAt'], reverse=True)
    if(sortBy == 'hotkey'):
        images.sort(key=lambda x: x['hotkey'])
    if(sortBy == 'uid'):
        images.sort(key=lambda x: x['id'])
    return images            


# # Create a directory to store images
# os.makedirs("wandb_images", exist_ok=True)

# # Iterate through all the files in the run
# for file in run.files():
#     # Check if the file is an image
#     if file.name.endswith(".png") or file.name.endswith(".jpg"):
#         # Download the file
#         # file.download(root="wandb_images")
#         print(f"Downloaded {file.url}")

# print("All images have been downloaded to the 'wandb_images' directory.")
