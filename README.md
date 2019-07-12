# ROT13 Task in typescript


This project encodes/decodes the text fields in an HTTP request body (for POST method). To run the project, use: npm run dev in the terminal.

Examples:

<strong>Encoding: To encode an incoming request body, send the below request via POSTMAN </strong>

Route: localhost:3000/encode

Request Body JSON: 

{ <br />
	"input1": "ABCDEFG", <br />
	"input2": "BCDEFGH" <br />
}

Response will be:

[<br />
    "NOPQRST", <br />
    "OPQRSTU" <br />
]




<strong>Decoding: To decode an incoming request body, send the below request via POSTMAN</strong>

Route: localhost:3000/decode

Request Body JSON: 

{ <br />
	"input1": "NOPQRST", <br />
	"input2": "OPQRSTU" <br />
}


Response will be:

[ <br />
    "ABCDEFG", <br />
    "BCDEFGH" <br />
]


<strong>UI Screenshots</strong>

![Encoding Data](screenshots/encode.png "Encoding Data")


![Decoding Data](screenshots/decode.png "Decoding Data")
