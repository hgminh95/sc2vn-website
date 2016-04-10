import urllib
import sys
import os

fontawesome_url = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
eot_url = '/../../fonts/fontawesome-webfont.eot?v=4.5.0'
woff2_url = '/../../fonts/fontawesome-webfont.woff2?v=4.5.0'
woff_url = '/../../fonts/fontawesome-webfont.woff?v=4.5.0'
ttf_url = '/../../fonts/fontawesome-webfont.ttf?v=4.5.0'
svg_url = '/../../fonts/fontawesome-webfont.svg?v=4.5.0#fontawesomeregular'

jquery_url = 'https://code.jquery.com/jquery-2.2.2.min.js'

bootstrapjs_url = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'

chartjs_url = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js'

if not os.path.exists('public/fonts'):
    os.makedirs('public/fonts')

# Font awesome
sys.stdout.write("Font Awesome - Downloading...")
sys.stdout.flush()
fontawesome = urllib.URLopener()
fontawesome.retrieve(fontawesome_url, "public/stylesheets/fontawesome.min.css")

webfont = urllib.URLopener()
webfont.retrieve(fontawesome_url + eot_url, 'public/fonts/fontawesome-webfont.eot')
webfont.retrieve(fontawesome_url + woff2_url, 'public/fonts/fontawesome-webfont.woff2')
webfont.retrieve(fontawesome_url + woff_url, 'public/fonts/fontawesome-webfont.woff')
webfont.retrieve(fontawesome_url + ttf_url, 'public/fonts/fontawesome-webfont.ttf')
webfont.retrieve(fontawesome_url + svg_url, 'public/fonts/fontawesome-webfont.svg')

sys.stdout.write("\rFont Awesome - Done          \n")
sys.stdout.flush()

# Jquery
sys.stdout.write("Jquery - Downloading...")
sys.stdout.flush()
fontawesome = urllib.URLopener()
fontawesome.retrieve(jquery_url, "public/javascripts/jquery.min.js")
sys.stdout.write("\rJquery - Done          \n")
sys.stdout.flush()

# Bootstrap
sys.stdout.write("BootstrapJS - Downloading...")
sys.stdout.flush()
fontawesome = urllib.URLopener()
fontawesome.retrieve(bootstrapjs_url, "public/javascripts/bootstrap.min.js")
sys.stdout.write("\rBootstrapJS - Done          \n")
sys.stdout.flush()

# Chart JS
sys.stdout.write("ChartJS - Downloading...")
sys.stdout.flush()
chartjs = urllib.URLopener()
chartjs.retrieve(chartjs_url, "public/javascripts/chartjs.min.js")
sys.stdout.write("\rChartJS - Done          \n")
sys.stdout.flush()
