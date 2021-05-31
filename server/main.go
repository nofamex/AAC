package main

import (
	"fmt"
	"log"

	"github.com/nofamex/AAC/server/util"
	"github.com/nofamex/AAC/server/api"
)

func main() {
	config, err := util.LoadConfig("../")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	
	server, err := api.NewServer(config)
	err = server.StartServer(config.Port)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
	
	fmt.Println("Starting")
}
