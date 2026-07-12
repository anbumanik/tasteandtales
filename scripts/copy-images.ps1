$artifactsDir = "C:\Users\anbum\.gemini\antigravity-ide\brain\50157a3c-26a5-414e-8832-a0ade296bc0a"
$publicDir = "D:\taste&taste\public"

$copies = @(
  @{ src = "gift_box_hero_1783852998962.png";       dst = "images\hero\gift-box-hero.jpg" },
  @{ src = "millet_ladoo_1783853018089.png";         dst = "images\products\millet-ladoo-1.jpg" },
  @{ src = "ragi_barfi_1783853027766.png";           dst = "images\products\ragi-barfi-1.jpg" },
  @{ src = "jowar_chakli_1783853038286.png";         dst = "images\products\jowar-chakli-1.jpg" },
  @{ src = "millet_mixture_1783853056443.png";       dst = "images\products\millet-mixture-1.jpg" },
  @{ src = "diwali_hamper_1783853084260.png";        dst = "images\products\diwali-hamper-1.jpg" },
  @{ src = "kaju_katli_1783853102306.png";           dst = "images\products\kaju-katli-1.jpg" },
  @{ src = "millet_choco_bites_1783853124463.png";   dst = "images\products\millet-choco-bites-1.jpg" },
  @{ src = "corporate_gift_box_1783853135695.png";   dst = "images\products\corporate-classic-1.jpg" },
  @{ src = "grandmother_kitchen_1783853146980.png";  dst = "images\story\grandmother-kitchen.jpg" },
  @{ src = "millet_fields_1783853168545.png";        dst = "images\story\millet-fields.jpg" },
  @{ src = "og_fallback_1783853180759.png";          dst = "og-fallback.jpg" }
)

foreach ($c in $copies) {
  $src = Join-Path $artifactsDir $c.src
  $dst = Join-Path $publicDir $c.dst
  $dstDir = Split-Path $dst -Parent
  if (!(Test-Path $dstDir)) { New-Item -ItemType Directory -Force -Path $dstDir | Out-Null }
  if (Test-Path $src) {
    Copy-Item -Path $src -Destination $dst -Force
    Write-Host "Copied: $($c.dst)"
  } else {
    Write-Host "MISSING: $($c.src)"
  }
}
Write-Host "All done."
