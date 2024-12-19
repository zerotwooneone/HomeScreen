using HomeScreen.Server;
using HomeScreen.Server.Screen;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddSingleton< IScreenService,ScreenService>();
builder.Services.AddSingleton<ITimeProvider, HomeScreen.Server.Screen.TimeProvider>();

const string devCors = "dev";
builder.Services.AddCors(options =>
{
    options.AddPolicy(devCors,b =>
    {
        b
            .WithOrigins("http://localhost:62185", "http://127.0.0.1:62185")
            //.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("Content-Type", "X-Custom-Header");
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    //this must be AFTER UseRouting, but BEFORE UseSignalR
    app.UseCors(devCors);
}

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapHub<ScreenHub>("/screenHub");

app.Run();
