import json

class VulnDb:
    def __init__(self, data):
        self.issues = [json.loads(l) for l in data.split('\n') if l.strip()]

if __name__ == '__main__':
    with open('../../dataset/vulns.json', 'r') as f:
        db = VulnDb(f.read())
    print("total issues: %d"%len(db.issues))
