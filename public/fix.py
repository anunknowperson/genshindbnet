from os import walk, remove
import shutil

filenames = next(walk("C:\\Users\\Sereja\\Desktop\\genshindbnet\\www\\public\\resources"), (None, None, []))[2]  # [] if no file

for name in filenames:

	if '_' in name:

		remove("C:\\Users\\Sereja\\Desktop\\genshindbnet\\www\\public\\resources\\" + name)
	

	


