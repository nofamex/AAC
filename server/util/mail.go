package util

import (
	"fmt"
	"net/smtp"
)

var (
UnacTmpt = `Subject:  Verifikasi Pendaftaran Peserta UNAC 2021

Halo, peserta Unair National Accounting Competition 2021

Selamat! Anda telah terdaftar menjadi peserta UNAC 2021. Untuk kegiatan selanjutnya ketua tim diharapkan masuk ke Group Whatsapp melalui link berikut https://chat.whatsapp.com/HhJ2TF3YMA2CMlMO2NvzVS

Silahkan log-in akun anda melalui website www.aacunair.id untuk melihat informasi lebih lanjut mengenai lomba.

Segala bentuk informasi seperti username, password, dan alamat e-mail anda bersifat rahasia. Jangan menginformasikan data tersebut kepada siapapun.

Silahkan menghubungi contact person di bawah ini jika terdapat kendala terkait kelancaran lomba.

Contact Person:
- Stefanie Natania (Acara) 
ID Line: stefanienatania
Whatsapp: 081217276727
- Ribka Christy (kesekretariatan) 
ID Line: ribkajulianovac
Whatsapp: 082141798916
`

TacTmpt = `Subject: Pendaftaran Peserta TAC 2021

Halo, peserta Teenage Accounting Competition 2021

Selamat! Anda telah terdaftar menjadi peserta TAC 2021. Untuk kegiatan selanjutnya ketua tim diharapkan masuk ke Group Whatsapp melalui link berikut https://chat.whatsapp.com/Fmyq6HtKlCqFM7vZymEE0t

Silahkan log-in akun anda melalui website www.aacunair.id untuk melihat informasi lebih lanjut mengenai lomba.

Segala bentuk informasi seperti username, password, dan alamat e-mail anda bersifat rahasia. Jangan menginformasikan data tersebut kepada siapapun.

Silahkan menghubungi contact person di bawah ini jika terdapat kendala terkait kelancaran lomba.

Contact Person:
- Eza Bagus (Acara) 
ID Line: ezabagusm
Whatsapp: 081216773799
- Azzah Vashti (Kesekretariatan) 
ID Line: azzahvashp
Whatsapp: 08993999188
`
)

func SendMail(config Config, toMail, competition string) {

	// Sender data.
	from := config.Email
	password := config.Password

	// Receiver email address.
	to := []string{
		toMail,
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Authentication.
	var messageBody string
	if competition == "unac" {
		messageBody = fmt.Sprintf(UnacTmpt)
	} else if competition == "tac" {
		messageBody = fmt.Sprintf(TacTmpt)
	}

	messageByte := []byte(messageBody)
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, messageByte)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Email Sent Successfully")
}
