import json

class VulnDb:
    def __init__(self, data):
        self.issues = [json.loads(l) for l in data.split('\n') if l.strip()]

if __name__ == '__main__':
    with open('../../dataset/vulns-1.json', 'r', encoding="utf-8") as f:
        db1 = VulnDb(f.read())
    with open('../../dataset/vulns-2.json', 'r', encoding="utf-8") as f:
        db2 = VulnDb(f.read())
    print("total issues: %d"%(len(db1.issues)+len(db2.issues)))
