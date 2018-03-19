echo 'SELECT * FROM matches' | mysql -B -u root -p db > temp
sed 's/\t/,/g' temp > out
rm -r temp
