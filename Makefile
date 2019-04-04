current_dir = $(shell pwd)

postgresdb:
	docker run -d --hostname postgresdb -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -v pg_data:/var/lib/postgresql/data postgres:9.6
swaggerui:
	docker run -p 8085:8080 -d -e SWAGGER_JSON=/app/swagger.json -v "${current_dir}/public":"/app" swaggerapi/swagger-ui

swaggerEditor:
	docker run -d -e SWAGGER_JSON=/app/swagger.json -v "${current_dir}/public":"/app" -p 8086:8080 swaggerapi/swagger-editor