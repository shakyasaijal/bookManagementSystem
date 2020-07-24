import subprocess

apps_for_migration_folder = ['books']

print("=======================================")
print("-- Creating Migration Folders")
print("=======================================")

for i in apps_for_migration_folder:
    try:
        subprocess.call(
        'cd {} && mkdir migrations && touch migrations/__init__.py'.format(i.replace("'", '')), shell=True)
        print("Migration folder created for {}".format(i))
    except Exception as e:
        pass