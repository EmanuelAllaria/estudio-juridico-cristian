<?php
/**
 * Proxy en vivo para Google Places API (New).
 * 1. Copiá config.sample.php → config.php
 * 2. Pegá tu API key (Places API New habilitada en Google Cloud)
 * 3. Subí esta carpeta api/ junto con la landing al hosting PHP
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Access-Control-Allow-Origin: *');

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(503);
    echo json_encode(['error' => 'Falta api/config.php — copiá config.sample.php']);
    exit;
}

$config = require $configFile;
$apiKey = $config['places_api_key'] ?? '';
$placeId = $config['place_id'] ?? 'ChIJ-WaEq6DLvJURNPjBCPDYmJE';

if (!$apiKey) {
    http_response_code(503);
    echo json_encode(['error' => 'places_api_key vacía en config.php']);
    exit;
}

$url = 'https://places.googleapis.com/v1/places/' . urlencode($placeId);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 12,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'X-Goog-Api-Key: ' . $apiKey,
        'X-Goog-FieldMask: rating,userRatingCount,reviews',
        'X-Goog-LanguageCode: es',
    ],
]);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status !== 200 || !$response) {
    http_response_code($status ?: 502);
    echo json_encode(['error' => 'Error al consultar Google Places', 'status' => $status]);
    exit;
}

$data = json_decode($response, true);
$reviews = [];

if (!empty($data['reviews']) && is_array($data['reviews'])) {
    foreach ($data['reviews'] as $r) {
        $reviews[] = [
            'name' => $r['authorAttribution']['displayName'] ?? 'Cliente',
            'rating' => $r['rating'] ?? 5,
            'text' => $r['text']['text'] ?? '',
            'date' => $r['relativePublishTimeDescription'] ?? '',
        ];
    }
}

echo json_encode([
    'rating' => $data['rating'] ?? 5,
    'userRatingCount' => $data['userRatingCount'] ?? 0,
    'reviews' => $reviews,
    'source' => 'places-api-proxy',
    'fetchedAt' => gmdate('c'),
], JSON_UNESCAPED_UNICODE);
