# Use the official Python image
FROM python:3.11-slim
# Set display (required for GUI apps to work in Docker, may need extra setup on Mac)
ENV DISPLAY=:0
# Install Tkinter
RUN apt-get update && apt-get install -y python3-tk
# Set the working directory in the container
WORKDIR /app
# Copy your Python script into the container
COPY DockerDemo.py .
# Run the Python script
CMD ["python", "DockerDemo.py"]