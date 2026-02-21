"""
Environment configuration validator
"""
import os
import sys


def validate_env():
    """Validate required environment variables"""
    required_vars = {
        'DJANGO_SECRET_KEY': 'Django secret key',
        'DEBUG': 'Debug mode flag',
    }
    
    missing = []
    for var, description in required_vars.items():
        if not os.getenv(var):
            missing.append(f"{var} ({description})")
    
    if missing:
        print("ERROR: Missing required environment variables:")
        for var in missing:
            print(f"  - {var}")
        sys.exit(1)
    
    # Validate DEBUG setting
    debug = os.getenv('DEBUG', 'True').lower()
    if debug not in ['true', 'false']:
        print("ERROR: DEBUG must be 'True' or 'False'")
        sys.exit(1)
    
    # Warn if using default secret key in production
    if not os.getenv('DEBUG', 'True').lower() == 'true':
        secret = os.getenv('DJANGO_SECRET_KEY', '')
        if 'dev-secret' in secret or len(secret) < 50:
            print("WARNING: Using weak SECRET_KEY in production!")
    
    print("✓ Environment configuration validated")


if __name__ == '__main__':
    validate_env()
