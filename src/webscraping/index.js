const puppeteer = require('puppeteer')
const fs =require('fs/promises')
const cron = require('node-cron')

async function start(){

    const browser= await puppeteer.launch();
    const page= await browser.newPage();
    await page.goto("https://learnwebcode.github.io/practice-requests/")
   
    const names= await page.evaluate(()=> {
        return Array.from(document.querySelectorAll("body > div > div > div > strong")).map(x => x.textContent)
    })
    await fs.writeFile("name.txt",names.join("\r\n"))

    await page.click('#clickme')
    const clickData = await page.$eval('#data',el=>el.textContent)
    console.log('====================================');
    console.log(clickData);
    console.log('====================================');

    await page.type('#ourfield','blue')
    await Promise.all([page.click('#ourform > button'),page.waitForNavigation()])


    const info = await page.$eval("#message", el => el.textContent)
    console.log(info)
    const photos =await  page.$$eval("img",imgs=>{
        return imgs.map(x=>x.src)
    })
    for(const photo of photos){
        const imagepage = await page.goto(photo)
        await fs.writeFile(photo.split("/").pop(),await imagepage.buffer())
    }
    await browser.close()
}

cron.schedule("*/5*****",start)

export default start