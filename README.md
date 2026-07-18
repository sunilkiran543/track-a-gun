# Track a Gun

Track a Gun is a community-powered public safety application built with React Native and Expo. It enables users to securely and anonymously report localized firearm sightings to provide real-time, location-based safety alerts to individuals nearby. 

The application is engineered to increase situational awareness, support informed community decision-making, and offer rapid-response logging workflows designed specifically for high-stress environments.

## Core Tech Stack & Features
* **Framework:** React Native & Expo Go for cross-platform mobile compatibility.
* **Navigation:** Dynamic multi-screen submission flows powered by React Navigation.
* **Architecture:** Structured local state management optimized for anonymous, rapid data collection.
* **UI/UX:** High-contrast layout designed for immediate access and accessibility.
## Setup & Local Development
Since the application uses the Expo Go framework, you can run the development environment locally to test the workflows:
1. Clone the repository: `git clone https://github.com/sunilkiran543/track-a-gun.git`
2. Install project dependencies: `npm install`
3. Start the local server: `npx expo start`
4. Scan the generated QR code using the **Expo Go** app on iOS or Android to launch the interface.

## System Workflow & Architecture
* **Reporting Pipeline:** Users utilize a streamlined, high-contrast multi-screen form to log incident criteria (location variables, description details) without collecting identifiable telemetry data.
* **Navigation Architecture:** Built on top of a native stack navigator (`React Navigation`) to guarantee fluid, zero-latency transitions during active data entry.
