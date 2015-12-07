-- user_info
create table user_info(
    id int(6) not null auto_increment,
    uid BIGINT not null,
    name char(255) not null,
    profile_image_url varchar(1024) not null,
    verified int(1) not null,
    PRIMARY KEY (`id`)
) ENGINE = MyISAM auto_increment = 1001;

create table photos(
    id int not null auto_increment,
    uid BIGINT not null,
    photo_id char(20) not null,
    album_id char(20) not null,
    pid char(32) not null,
    pic_host char(30) not null,
    pic_name char(40) not null,
    PRIMARY KEY (`id`)
) ENGINE = MyISAM;
