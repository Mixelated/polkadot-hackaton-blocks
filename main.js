const { ApiPromise, WsProvider } = require('@polkadot/api');
const url = 'wss://rpc.polkadot.io'

// usage: --findblock parameter finds specific block. Otherwise will wait for any block
async function run () {
    try {
        const idx = process.argv.indexOf('--findblock') 
        const provider = new WsProvider(url);
        const connection = await ApiPromise.create({ provider });
        let blockLookup = 0;
        if(process.argv.indexOf('--findblock') != -1) blockLookup = process.argv[idx + 1];
        
        // find specific block
        if(blockLookup) {
            const block = await connection.rpc.chain.getBlockHash(blockLookup);
            console.log(`Block Found: ${block}`)
            process.exit()
        } 
        // wait for any block
        const block = await connection.rpc.chain.getBlock()
        console.log(`Block Found: ${block}`)
        process.exit()

    } catch (e) {
        console.log(`something went wrong`, e)
        process.exit()
    }
}

run()