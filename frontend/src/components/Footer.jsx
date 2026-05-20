export default function Footer() {
    return (
        <footer class="footer">
            <div className="max-w-[1280px] px-[64px] py-8 w-full mx-auto  flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="label-sm">&copy; 2026 Hooma by Ollynth. All rights reserved.</span>
                <ul className="footer-links">
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </footer>
    )
}