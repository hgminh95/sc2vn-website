import os

DIR_PATH = 'bin/sample_data/'
for filename in os.listdir(DIR_PATH):
  if filename.endswith('.json'):
    (dbname, collectionname, __) = filename.split('_')
    command = "mongoimport --db %s --collection %s --drop --file %s" % (dbname, collectionname, DIR_PATH+filename)
    os.system(command)
