export const createUrl=async(url:string)=>{
	const username = "abat"; 
    const password = "5hWDEcFK4FUW"; 

    const credentials = btoa(`${username}:${password}`); 
	try {
		const response = await fetch("https://urlshortener.smef.io/urls", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${credentials}`, 
		  },
		  body: JSON.stringify({ "url": url, "ttlInSeconds": 500 }),
		});

		return response;

	  } catch (error) {
		throw new Error(`Failed to shorten URL`);
	  }
	
}
