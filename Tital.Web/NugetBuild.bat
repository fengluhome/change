@echo off
set version=1.1.78
NuGet SetApiKey ae26cfd2-8316-49bd-a94b-01cf8bf1c8f2
nuget pack  Tital.Web.nuspec
nuget push Tital.Web.%version%.nupkg  
del Tital.Web.%version%.nupkg
pause  