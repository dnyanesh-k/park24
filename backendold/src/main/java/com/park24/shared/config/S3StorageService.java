package com.park24.shared.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
//@RequiredArgsConstructor
public class S3StorageService {
	private final S3Client s3Client;

	private final String bucketName;

	public S3StorageService(S3Client s3Client, @Value("${spring.cloud.aws.s3.bucket}") String bucketName) {
		this.s3Client = s3Client;
		this.bucketName = bucketName;
	}

	public String uploadFile(MultipartFile file, String folder) {

		String fileName = folder + "/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();

		try {
			PutObjectRequest request = PutObjectRequest.builder().bucket(bucketName).key(fileName)
					.contentType(file.getContentType()).build();

			s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

			return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;

		} catch (IOException e) {
			throw new RuntimeException("Error uploading to S3", e);
		}
	}
}
