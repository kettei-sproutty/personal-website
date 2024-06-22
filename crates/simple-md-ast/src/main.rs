fn main() {
    let arr = vec![1, 2, 3, 4];
    let (odd, even): (Vec<i32>, Vec<i32>) = arr.into_iter().partition(|&n| n % 2 == 0);
    println!("{:?}", odd);
    println!("{:?}", even);
}
