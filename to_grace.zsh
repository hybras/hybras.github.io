jekyll build
find _site -type f -exec sed -i 's:href="/:href="/~vchari/:g' {} \;
find _site -type f -exec sed -i 's:src="/:src="/~vchari/:g' {} \;
sshpass -p "$SSHPASS" scp -r _site/* vchari@grace.umd.edu:/pub/vchari