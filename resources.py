import urllib
import sys
import os

resources = [
    {
        "name": "Font awesome - css",
        "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        "dir": "public/stylesheets/fontawesome.min.css"
    },
    {
        "name": "Font awesome - eot",
        "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.eot?v=4.5.0",
        "dir": "public/fonts/fontawesome-webfont.eot"
    },
    {
        "name": "Font awesome - woff2",
        "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.woff2?v=4.5.0",
        "dir": "public/fonts/fontawesome-webfont.woff2"
    },
    {
        "name": "Font awesome - woff",
        "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.woff?v=4.5.0",
        "dir": "public/fonts/fontawesome-webfont.woff"
    },
    {
        "name": "Font awesome - ttf",
        "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.ttf?v=4.5.0",
        "dir": "public/fonts/fontawesome-webfont.ttf"
    },
    {
        "name": "Font awesome - svg",
        "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/fonts/fontawesome-webfont.svg?v=4.5.0#fontawesomeregular",
        "dir": "public/fonts/fontawesome-webfont.svg"
    },
    {
        "name": "JQuery",
        "url": "https://code.jquery.com/jquery-2.2.2.min.js",
        "dir": "public/javascripts/jquery.min.js"
    },
    {
        "name": "BootstrapJS",
        "url": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
        "dir": "public/javascripts/bootstrap.min.js"
    },
    {
        "name": "ChartJS",
        "url": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js",
        "dir": "public/javascripts/chartjs.min.js"
    },
    {
        "name": "Pace",
        "url": "https://raw.githubusercontent.com/HubSpot/pace/v1.0.0/pace.min.js",
        "dir": "public/javascripts/pace.min.js"
    },
    {
        "name": "Tournament Drawer",
        "url": "http://hgminh95.github.io/tournament-drawer/tournament-drawer.min.js",
        "dir": "public/javascripts/tournament-drawer.min.js"
    }
]

def getResource(res):
    sys.stdout.write("{0} - Downloading...".format(res["name"]))
    sys.stdout.flush()

    fetcher = urllib.URLopener()
    fetcher.retrieve(res["url"], res["dir"])

    sys.stdout.write("\r{0} - Done          \n".format(res["name"]))
    sys.stdout.flush()

if not os.path.exists("public/fonts"):
    os.makedirs("public/fonts")

for res in resources:
    getResource(res)

