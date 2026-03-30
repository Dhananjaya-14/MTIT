$services = @("api-gateway", "customer-service", "order-service", "payment-service", "product-service")

$env:NODE_OPTIONS = "--require c:\Users\navee\OneDrive\Documents\GitHub\MTIT\dns-fix.js"

foreach ($service in $services) {
    Set-Location "c:\Users\navee\OneDrive\Documents\GitHub\MTIT\$service"
    Write-Host "Starting $service..."
    Start-Process powershell -ArgumentList "-NoExit", "-Title", "`"$service`"", "-Command", "`$env:NODE_OPTIONS='--require c:\Users\navee\OneDrive\Documents\GitHub\MTIT\dns-fix.js'; npm start"
}
Write-Host "All services started with DNS fix."
