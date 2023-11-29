import pickle

import pytest
from bittensor.subtensor import subtensor as bt_subtensor
from fastapi.testclient import TestClient


@pytest.fixture
def test_client(mocker):
    """This fixture is utilized to mock the bittensor.subtensor.metagraph method,
    which takes a long time to load and is unsuitable for testing purposes.
    The metagraph pickle must be created beforehand."
    """  # NOQA

    try:
        with open("./data/metagraph.pickle", "rb") as f:
            pickled_metagraph = pickle.load(f)  # nosec
            mocker.patch.object(
                bt_subtensor,
                "metagraph",
                autospec=True,
                return_value=pickled_metagraph,
            )
    except Exception:
        print("Cannot load the pickled metagraph. Not use mock for this case.")

    from fastapi_app import app

    return TestClient(app)
