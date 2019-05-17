import sys
import requests

def log(msg, port):
    res = requests.post(f"http://localhost:{port}/log", data={"msg": msg})
    assert res.status_code == 200, "Bad status code: " + str(res.status_code)

if __name__ == "__main__":
    log(" ".join(sys.argv[2:]), sys.argv[1])
