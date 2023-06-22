import React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import RenderedMarkdown from './renderedMarkdown'
import Fuse from 'fuse.js'



const SEVERITY_SCORES = {
    'critical': 4,
    'major': 3,
    'high': 3,
    'medium': 2,
    'minor': 1,
    'low': 1,
    'low-info': 1,
    undefined: 0
}


const SEVERITY_ICONS = {
    'critical': '⭕',
    'major': '🔴',
    'medium': '🟠',
    'minor': '🔵',
    undefined: ''
}

function getSeverityName(severityScore) {
    if (severityScore >= 4) return "critical";
    else if (severityScore >= 3) return "major";
    else if (severityScore >= 2) return "medium";
    else if (severityScore >= 1) return "minor";
    else if (severityScore >= 0) return ""; //🟡
    return "";
}

function getSeverityIcon(severityScore) {
    if (severityScore >= 4) return "⭕";
    else if (severityScore >= 3) return "🔴";
    else if (severityScore >= 2) return "🟠";
    else if (severityScore >= 1) return "🔵";
    else if (severityScore >= 0) return ""; //🟡
    return "";
}

function simpleSearch(haystack, needle) {
    const results = [];
    needle = needle.toLowerCase();
    for (const issue of haystack) {
        const currentResult = { score: 0, item: issue }
        if (issue.title) {
            currentResult.score += issue.title.toLowerCase().split(needle).length / 5
        }
        if (issue.body) {
            currentResult.score += issue.body.toLowerCase().split(needle).length * 0.00001;
        }
        if (currentResult.score > 0) {
            results.push(currentResult)
        }
    }
    return results;
}

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [issues, setIssues] = useState({});
    const [totalIssues, setTotalIssues] = useState('');

    const getInitialProps = async (ctx) => {

        const all = await (await fetch('./cache/vulns.json')).text();

        const all_issues = []
        for(let line of all.split("\n")){
            if(line.trim().length == 0){
                continue;
            } 
            try{
                all_issues.push(JSON.parse(line))
            } catch(e){
                console.log(line)
                throw e
            }
        }

        return {
            all: all_issues
        }
    }

    const search = async () => {
        var cachedIssues = issues;
        
        if (!Object.keys(cachedIssues).length) {
            cachedIssues = await getInitialProps();
            setIssues(cachedIssues);
        }
        //console.log(issues)
        setTotalIssues(Object.values(cachedIssues).reduce((result, current)=> result += current.length, 0));
        const searchResults = [];
        for (const issueBatchID of Object.keys(cachedIssues)) {
            const issueBatch = cachedIssues[issueBatchID];

            const options = {
                shouldSort: true,
                location: 0,
                distance: 100,
                threshold: 0.6,
                minMatchCharLength: 2,
                includeScore: true,
                ignoreLocation: true,
                keys: [
                    {
                        name: 'title',
                        weight: 3
                    },
                    {
                        name: 'body',
                        weight: 2
                    },
                    {
                        name: 'severity',
                        weight: 2
                    },
                    'tags',
                    'dataSource.url'
                ]
            }
            const fuse = new Fuse(issueBatch, options)

            const fresult = fuse.search(query);
            //const fresult = simpleSearch(issueBatch, query);
            for (const issue of fresult) {
                issue.item.id = `${issueBatchID}-${searchResults.length}-${issue.id}`;
                issue.score -= (SEVERITY_SCORES[issue.item.severity] || 0) / 4 / 10000 ;
                searchResults.push(issue);
            }
        }

        const sortedResult = searchResults.sort((a, b) => a.score - b.score).slice(0, 100);
        setResults(sortedResult);
        //console.log(sortedResult);
    }


    return (
        <div>
            <Head>
                <title>Search</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
            </Head>
            <div>
                {totalIssues ? `Total Vulnerabilities in Database: ${totalIssues}` : ''}<br></br>
                {results && results.length ? `Displaying: ${results.length} (limit 100)` : ''}
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {results.map(result => (
                                <li className="list-group-item" key={result.item.id}>
                                    <h3><sup><small><a href={result.item.dataSource.url}>↗ [{result.item.dataSource.name}]</a></small></sup><ReactMarkdown>{result.item.title}</ReactMarkdown></h3>
                                    <p>{SEVERITY_ICONS[result.item.severity]} {result.item.severity} </p>
                                    <ReactMarkdown>{result.item.body}</ReactMarkdown>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Search