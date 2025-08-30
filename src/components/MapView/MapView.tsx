"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState, useCallback } from "react";
import useMapStore from "@/store/useMapStore";
import styles from "./MapView.module.css";

interface MapViewProps {
  province?: string;
}

export default function MapView({ province }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { listings, fetchingListing } = useMapStore();
  const [viewMode, setViewMode] = useState<"cluster" | "heatmap">("cluster");
  const [mapReady, setMapReady] = useState(false);

  const MAPTILER_KEY = "pGlY468dhiFFysm9uTkt";
  const baseMaps = {
    Streets: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
    Satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
    Dark: `https://api.maptiler.com/maps/darkmatter/style.json?key=${MAPTILER_KEY}`,
    Light: `https://api.maptiler.com/maps/basic/style.json?key=${MAPTILER_KEY}`,
  };
  const [baseMap, setBaseMap] = useState<keyof typeof baseMaps>("Streets");

  const geocodeProvince = async (
    provinceName: string
  ): Promise<[number, number]> => {
    const res = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        provinceName
      )}.json?key=${MAPTILER_KEY}`
    );
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return [lng, lat];
    }
    return [14.0583, 108.2772]; // Default center of Vietnam
  };

  // ✅ Hàm thêm layer và source
  const addListingLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return; // check style đã load chưa

    // Remove previous layers and source
    ["clusters", "cluster-count", "unclustered-point", "heatmap"].forEach(
      (id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      }
    );
    if (map.getSource("listings")) {
      map.removeSource("listings");
    }

    map.addSource("listings", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: listings,
      },
      cluster: viewMode === "cluster",
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    if (viewMode === "cluster") {
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "listings",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#51bbd6",
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 50, 40],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "listings",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "listings",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#f28cb1",
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      map.on("click", "unclustered-point", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;

        const { title, price, area, ward, district, province } =
          feature.properties;

        new maplibregl.Popup()
          .setLngLat((feature.geometry as any).coordinates)
          .setHTML(
            `<strong>${title}</strong><br/>
             Giá: ${price} VND<br/>
             Diện tích: ${area} m²<br/>
             ${ward} ${district}, ${province}`
          )
          .addTo(map);
      });
    } else {
      map.addLayer({
        id: "heatmap",
        type: "heatmap",
        source: "listings",
        maxzoom: 15,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "price"],
            0,
            0,
            10000000000,
            1,
          ],
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
          ],
          "heatmap-radius": 25,
          "heatmap-opacity": 0.8,
        },
      });
    }
  }, [listings, viewMode]);

  // ✅ Thêm layer khi listings thay đổi
  useEffect(() => {
    if (mapReady && listings.length > 0) {
      addListingLayers();
    }
  }, [mapReady, listings, viewMode, addListingLayers]);

  // ✅ Khởi tạo map
  useEffect(() => {
    if (!mapContainer.current) return;

    const initMap = async () => {
      const center = await geocodeProvince(province || "Việt Nam");

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: baseMaps[baseMap],
        center,
        zoom: province ? 10 : 4.5,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");
      mapRef.current = map;

      map.on("load", () => {
        setMapReady(true); // ✅ style và dữ liệu đã sẵn sàng
        fetchingListing(province);
      });
    };

    initMap();

    return () => {
      mapRef.current?.remove();
    };
  }, [province, baseMap]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapContainer}
        className={styles.mapContainer}
        style={{ width: "100%", height: "500px" }}
      />
      <button
        onClick={() =>
          setViewMode(viewMode === "cluster" ? "heatmap" : "cluster")
        }
        className={styles.viewMode}
      >
        {viewMode === "cluster"
          ? "Hiển thị bản đồ nhiệt"
          : "Hiển thị bản đồ gom nhóm"}
      </button>

      <select
        onChange={(e) => setBaseMap(e.target.value as keyof typeof baseMaps)}
        className={styles.baseMapSelect}
        value={baseMap}
      >
        {Object.keys(baseMaps).map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
