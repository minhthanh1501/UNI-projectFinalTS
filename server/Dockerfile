FROM node:16-alpine 
# From node:16 
# node : tên của image,
# 16-alpine : version nodejs
# câu lệnh chuẩn bị môi trường nodejs , version node16/-alpine

WORKDIR /minhthanh/backend
# định nghĩa 1 thư mục bên trong docker

COPY package*.json ./
# copy 2 file package.json và package-lock.json (cùng cấp với dockerfile)

RUN npm install

COPY . .
# copy tất cả source vào thư mục WORKDIR (cùng cấp với dockerfile)

# RUN npm run build-src (chỉ sử dụng khi có compiler)

CMD [ "npm","start" ]

# docker build --tag node-docker
#                     (tên image)
# build docker

#docker run -p 8080:8080 -d node-docker
# chạy docker