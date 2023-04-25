echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* shalev@176.58.119.242:/var/www/176.58.119.242/

echo "Done!"

