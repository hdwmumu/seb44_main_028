package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.product.dto.ProductDto;
import com.ftiland.travelrental.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Page<Product> findByMemberMemberId(Long memberId, Pageable pageable);

    List<Product> findAllByMemberMemberId(Long memberId);

    List<Product> findTop3ByOrderByViewCountDesc();

    @Query("SELECT p FROM Product p ORDER BY p.totalRateScore / p.totalRateCount DESC")
    List<Product> findTop3ByOrderByTotalRateScoreRatioDesc(Pageable pageable);

<<<<<<< HEAD
    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, ip.imageUrl, p.address) " +
=======
    List<Product> findTop3ByBaseFeeOrderByCreatedAtDesc(Integer baseFee);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, ip.imageUrl, p.address) " +
>>>>>>> 2358680 (:sparkles: main page featured product api 구현)
            "FROM ImageProduct ip JOIN ip.product p " +
            "WHERE p.member.memberId = :memberId " +
            "GROUP BY p.productId")
    Page<ProductDto> findProductDtosByMemberId(@Param("memberId") Long memberId, Pageable pageable);


}
