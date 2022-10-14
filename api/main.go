package main

import (
	"db/controller"
	"fmt"
	"net/http"
)

func accountHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case "GET":
		controller.FetchAccount(w)
	case "POST":
		controller.RegisterAccount(w, r)
	case "DELETE":
		controller.DeleteAccount(w, r)
	case "PUT":
		controller.RenameAccount(w, r)
	default:
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Method not allowed.\n")
	}
}

func messageHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	switch r.Method {
	case "GET":
		controller.FetchMessage(w)
	case "POST":
		controller.AddMessage(w, r)
	case "DELETE":
		controller.DeleteMessage(w, r)
	case "PUT":
		controller.EditMessage(w, r)
	case "OPTIONS":
		controller.FetchBookMark(w, r)
	default:
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Method not allowed.\n")
	}
}

func channelHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case "GET":
		controller.FetchChannel(w)
	case "POST":
		controller.AddChannel(w, r)
	default:
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Method not allowed.\n")
	}
}


func main() {
	http.HandleFunc("/account", accountHandler)
	http.HandleFunc("/message", messageHandler)
	http.HandleFunc("/channel", channelHandler)
	http.ListenAndServe(":8080", nil)
}
