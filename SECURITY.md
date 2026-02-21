# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@medtrack.ai (or your contact email).

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue

### Response Timeline

- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix timeline: Depends on severity

## Security Best Practices

### For Developers

1. Never commit sensitive data (.env files, keys, passwords)
2. Use environment variables for configuration
3. Keep dependencies updated
4. Follow OWASP security guidelines
5. Validate and sanitize all user inputs
6. Use parameterized queries to prevent SQL injection
7. Implement proper authentication and authorization

### For Deployment

1. Use HTTPS in production
2. Set DEBUG=False in production
3. Use strong SECRET_KEY
4. Configure ALLOWED_HOSTS properly
5. Enable CORS only for trusted origins
6. Regular security audits
7. Keep all dependencies updated
