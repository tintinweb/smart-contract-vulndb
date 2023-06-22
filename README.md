[<img width="700" alt="The Creed Rebellion!" src="https://user-images.githubusercontent.com/2865694/233321738-92a9335c-d331-441e-89c3-cfecb8291f01.png">](https://thecreed.xyz/)<br>
[[  🌐  ](https://thecreed.xyz/)[  🫂  ](https://community.thecreed.xyz/c/start-here)]
</sup><br/><br/>



# Smart Contract VulnDB

An open dataset of publicly available smart contract issues aggregated from various audit reports. The dataset can be accessed at 🌻 [vulns.json](public/cache/vulns.json), is updated once a day, and a live demo is available 🌐 [here](https://tintinweb.github.io/smart-contract-vulndb/
).

## 🔸 DataSet

[<img width="760" alt="image" src="https://github.com/tintinweb/smart-contract-vulndb/assets/2865694/78533545-fb72-4258-bfb9-31366fd05e8e">](https://github.com/tintinweb/smart-contract-vulndb/blob/main/public/cache/vulns.json)


* [vulns.json](public/cache/vulns.json)

## 🔸 Live Demo 

[<img width="941" alt="image" src="https://github.com/tintinweb/smart-contract-vulndb/assets/2865694/8c875b6b-abbe-4c22-b0fb-696d3670ab00">](https://tintinweb.github.io/smart-contract-vulndb/)

* [Demo](https://tintinweb.github.io/smart-contract-vulndb/)

## 🔸 Accessing the Latest Snapshot



- Shell
```
⇒  curl https://tintinweb.github.io/smart-contract-vulndb/cache/vulns.json
```

- JavaScript
```javascript
fetch('[https://api.example.com/data](https://tintinweb.github.io/smart-contract-vulndb/cache/vulns.json)')
  .then(response => response.text())
  .then(data => {
    // Process the retrieved data
    const issues = data.split('\n').filter(l => l.trim().length > 0).map(l => JSON.parse(l))
    console.log(issues);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });
```

## 🤓 For Nerds 

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

