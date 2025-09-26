# Image Organization Migration

## Filezilla Folder Structure to Create:

### Create these folders on Filezilla:
```
Public/
├── logos/               # Brand logos  
│   ├── imgtextlogo.webp
│   └── imglogoround.png
├── icons/              # Navigation icons  
│   ├── dashboard.png
│   ├── calendar.png
│   ├── harvesting.png
│   ├── distribution.png
│   ├── pools.png
│   ├── calculator.png
│   ├── vote.png
│   ├── shield.png
│   ├── refresh.png
│   ├── external-link.png
│   ├── left-arrow.png
│   └── right-arrow.png
├── social/             # Social media icons
│   ├── telegram.png
│   ├── twitter.png
│   ├── discordtab.png
│   └── homepage.png
├── tokens/             # Token logos  
│   ├── solanalogo.png
│   ├── bonklogo.png
│   ├── usdclogo.png
│   ├── radiumlogo.png
│   └── orcalogo.png
├── updates/            # Update images
│   ├── Imgupdate1.png
│   ├── Imgupdate2.png
│   ├── Imgupdate3.png
│   ├── Imgupdate4.png
│   ├── Imgupdate5.png
│   └── Imgupdate6.png
├── event-images/       # Event-related images
│   ├── kimbosponsor.jpg
│   ├── imggiveaway.jpg
│   ├── trackimgcoingecko.jpg
│   ├── newrewardsevent.jpg
│   ├── bitruelisting.jpg
│   └── alphailistingbanner.jpg
└── assets/             # Miscellaneous assets  
    ├── burgermenu.png
    ├── lottery.png
    ├── wallet.png
    ├── stocktwits.png
    ├── phantom.svg
    └── solflare.svg
```

## CODE CHANGES REQUIRED:

All image paths in /home/van/imgdashboard/website/src/app.js need to be updated from:
- src="/filename.ext" 
- TO: src="/folder/filename.ext"

Total paths to update: 64 paths in the app.js file.
