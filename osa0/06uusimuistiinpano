```mermaid

sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON File, 201 created
    deactivate server
    
     
    Note right of browser: Browser stays on the same site and the JSON file contains the message and its date
