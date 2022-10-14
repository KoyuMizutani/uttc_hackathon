#!/bin/sh

CMD_MYSQL="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}"
$CMD_MYSQL -e "create table accounts (
    name   VARCHAR(30) NOT NULL,
    id     CHAR(26)    NOT NULL primary key,
    color  CHAR(7)     NOT NULL
);"

$CMD_MYSQL -e  "insert into accounts values ('Koyu', '00000000000000000000000001', '#000000');"

CMD_MYSQL="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}"
$CMD_MYSQL -e "create table messages (
    content  VARCHAR(10000)  NOT NULL,
    id       CHAR(26) NOT NULL primary key, 
    sender   CHAR(26) NOT NULL,
    channel  CHAR(26) NOT NULL, 
    date     CHAR(19) NOT NULL,
    edited   BOOLEAN  NOT NULL
);"

$CMD_MYSQL -e  "insert into messages values ('Hello, Slack!', '00000000000000000000000ABC', '00000000000000000000000001', '00000000000000000000000001', '2022-07-23 12:00:00', false);"

CMD_MYSQL="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}"
$CMD_MYSQL -e "create table channels (
    name     VARCHAR(30)  NOT NULL,
    id       CHAR(26) NOT NULL primary key
);"

$CMD_MYSQL -e  "insert into channels values ('general', '00000000000000000000000001');"

CMD_MYSQL="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}"
$CMD_MYSQL -e "create table likes (
    likeId        CHAR(26) NOT NULL NOT NULL primary key,
    messageId     CHAR(26) NOT NULL,
    accountId     CHAR(26) NOT NULL
);"