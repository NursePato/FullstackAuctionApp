﻿namespace WebApplicationAuctions.Api.Middleware.Extensions
{
    public static class SwaggerExtension
    {

        public static IServiceCollection AddSwaggerExtended(this IServiceCollection services)
        {
            //Extenda servicecollection

            services.AddSwaggerGen(options =>
            {
                //Generell konfigurering av Swagger
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Our Auction API with swagger",
                    Version = "v1"
                });

                //Konfigurering av säkerhet i Swagger dvs att använd tokens
                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "Enter your valid token in the text input below.\n\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\""
                });

                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                         new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                 Id = "Bearer"
                            }
                        },
                          new string[] { }
                    }
                });
            });

            return services;
        }


        public static IApplicationBuilder UseSwaggerExtended(this IApplicationBuilder app)
        {
            //Konfigurering kopplat till applicationbuilder
            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API");
                options.RoutePrefix = string.Empty;
            });

            return app;
        }
    }
}
