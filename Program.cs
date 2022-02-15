using MiniProfilerDemo.Data;
using Microsoft.EntityFrameworkCore;
using StackExchange.Profiling.Storage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddOpenApiDocument();

builder.Services
    .AddMiniProfiler(options =>
    {
        options.RouteBasePath = "/profiler";

        if (options.Storage is MemoryCacheStorage storage)
        {
            storage.CacheDuration = TimeSpan.FromMinutes(60);
        }
    })
    .AddEntityFramework();

builder.Services
    .AddDbContext<BloggingContext>(x =>
    {
        var path = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var dbPath = System.IO.Path.Join(path, "blogging.db");

        x.UseSqlite($"Data Source={dbPath}");
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseOpenApi(); // serve documents (same as app.UseSwagger())
app.UseSwaggerUi3(); // serve Swagger UI
app.UseReDoc(); // serve ReDoc UI

app.UseMiniProfiler();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
