import os
import re

DIR_PATH = 'db/sample_data/'
for filename in os.listdir(DIR_PATH):
  if filename.endswith('.json'):
    (dbname, collectionname, __) = re.split('_|.json', filename)
    command = "mongoimport --db %s --collection %s --drop --file %s --jsonArray" % (dbname, collectionname, DIR_PATH+filename)
    os.system(command)
