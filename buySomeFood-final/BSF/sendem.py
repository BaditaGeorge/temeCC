# Python code to illustrate Sending mail from  
# your Gmail account  
import smtplib 
  
# creates SMTP session 
s = smtplib.SMTP('smtp.gmail.com', 587) 
  
# start TLS for security 
s.starttls() 
  
# Authentication 
s.login("","") 
  
# message to be sent 
message = "\r\n".join([
  "From: ",
  "To: ",
  "Subject: Test",
  "",
  "Why, oh why"
  ])

# sending the mail 
s.sendmail("", "", message) 
  
# terminating the session 
s.quit() 