
# To run this project use the docker file included.
### Please note that you have to have Docker installed on your linux machine. 

### Steps to run this project
1. Open a new terminal
2. type this command `git clone https://github.com/Ricksanchez-c137-og/techanova.git`
3. `cd techanova` 
4. `sudo docker build -t techanova .`
5. Wait for a bit (grab a cup of coffee) [dw it wont take much time]
6. `sudo docker run -d -p 80:80 --name al-hosn techanova`


### Troubleshooting

1. Please make sure that port 80 isnt used by any other service (e.g. apache2) if so you can use this command to stop it 
`sudo systemctl stop apache2`
2. always feel free to reach out to me on instagram `msf.202`