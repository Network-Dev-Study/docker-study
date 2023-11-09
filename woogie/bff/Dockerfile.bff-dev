# Base image
FROM python:3.9
ENV FLASK_ENV=development

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Command to run your application
CMD ["flask", "run", "--host=0.0.0.0", "--debug"]