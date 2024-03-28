const { secureHeapUsed } = require("crypto")

module.exports = async ({ github, owner, repo, issue_number, securityScanResult, fs }) => {

    console.log(``)
    console.log(`Looking at this repository: [${owner}/${repo}] with issue number [${issue_number}]`)
    console.log(`- securityScanResults: [${securityScanResult}]`)

    // load the securityScanResult file    
    const scanResult = fs.readFileSync(securityScanResult);
    console.log(`scanResult: [${scanResult}]`)
    let securityBody = [
        ``,
        `Security scan: `,
        `${scanResult}`
    ]

    // define the comment body
    let commentBody = [
        `# Scan Results`,
        `## Security`,
        ``
    ]

    // add the security results to the comment body
    commentBody.push.apply(commentBody, securityBody)

    // create comment letting the user know the results
    const result = await github.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body: commentBody.join('\n')
    });
    //console.log(`Issue created result: [${JSON.stringify(result)}]`)
}  