<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (!isset($_GET['symbols'])) {
    echo json_encode(['error' => 'No symbols provided']);
    exit;
}

$symbols = $_GET['symbols'];
$url = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" . urlencode($symbols);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    http_response_code($httpCode ?: 500);
    echo json_encode([
        'error' => 'Failed to fetch data from Yahoo Finance',
        'details' => $response ? 'API Error' : 'Connection Error',
        'http_code' => $httpCode
    ]);
} else {
    echo $response;
}
?>
