﻿using Microsoft.AspNetCore.SignalR;
using R3;

namespace HomeScreen.Server.Screen;

public class ScreenService: IScreenService
{
    private readonly ILogger<ScreenService> _logger;
    private readonly IHubContext<ScreenHub> _screenHubContext;

    public ScreenService(ILogger<ScreenService> logger,
        IHubContext<ScreenHub> screenHubContext)
    {
        _logger = logger;
        _screenHubContext = screenHubContext;
    }
    public async Task SetImageUrl(string url,CancellationToken cancellationToken)
    {
        await _screenHubContext.Clients.All.SendAsync("ImageUpdate", new ImageUpdateModel { Url = url }, cancellationToken);
    }

    public async Task SetSlideshow(string[] urls, CancellationToken cancellationToken=default)
    {
        await _screenHubContext.Clients.All.SendAsync("ImageUpdate", new ImageUpdateModel { Slideshow = urls }, cancellationToken);
    }
    
    private class ImageUpdateModel
    {
        public string[]? Slideshow { get; set; }
        public string? Url { get; set; }
    }
}