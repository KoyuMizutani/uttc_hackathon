package dao

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {

	//mysqlUser := os.Getenv("MYSQL_USER")
	//mysqlPwd := os.Getenv("MYSQL_PWD")
	//mysqlHost := os.Getenv("MYSQL_HOST")
	//mysqlDatabase := os.Getenv("MYSQL_DATABASE")
	//parseTime := "parseTime=true&loc=Asia%2FTokyo"
	//connStr := fmt.Sprintf("%s:%s@%s/%s?%s", mysqlUser, mysqlPwd, mysqlHost, mysqlDatabase, parseTime)

	// ローカルで繋げる場合
	err := godotenv.Load("./mysql/.env_mysql")
	if err != nil {
		fmt.Println("Error loading .env file")
		fmt.Print(err)
	}
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	port := os.Getenv("PORT")
	dbname := os.Getenv("MYSQL_DATABASE")
	connStr := user + ":" + pw + "@tcp(localhost:" + port + ")/" + dbname + "?parseTime=true&loc=Asia%2FTokyo"

	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Cannot Open Database.")
		fmt.Print(err)
	}

	return db
}
