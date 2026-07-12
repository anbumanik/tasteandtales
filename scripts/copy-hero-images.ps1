$artifactsDir = "C:\Users\anbum\.gemini\antigravity-ide\brain\50157a3c-26a5-414e-8832-a0ade296bc0a"
$publicDir = "D:\taste&taste\public"

$copies = @(
  @{ src = "hero_box_base_1783853847529.png"; dst = "images\hero\hero_box_base.png" },
  @{ src = "hero_box_lid_1783853858324.png";  dst = "images\hero\hero_box_lid.png" },
  @{ src = "hero_sweet_ladoo_1783853870080.png"; dst = "images\hero\hero_sweet_ladoo.png" },
  @{ src = "hero_sweet_barfi_1783853888116.png"; dst = "images\hero\hero_sweet_barfi.png" },
  @{ src = "hero_sweet_chakli_1783853901024.png"; dst = "images\hero\hero_sweet_chakli.png" }
)

foreach ($c in $copies) {
  $src = Join-Path $artifactsDir $c.src
  $dst = Join-Path $publicDir $c.dst
  if (Test-Path $src) {
    Copy-Item -Path $src -Destination $dst -Force
    Write-Host "Copied: $($c.dst)"
  } else {
    Write-Host "MISSING: $($c.src)"
  }
}
Write-Host "All done."
